using System.Data;
using System.Reflection;

namespace EDataBank.Web.Api.Utility;

public static class Helper
{
  public static string GenerateOTP()
  {
    Random rnd = new Random();
    var r = rnd.Next(100000, 999999).ToString();
    return r;
  }
  public static void LogException(Exception ex, RouteData routeData, ILogger _logger)
  {
    string? actionName = routeData.Values["action"]!.ToString();
    string? controllerName = routeData.Values["controller"]!.ToString();
    _logger.LogError(ex, $"{controllerName}/{actionName}", null!);
  }
  public static DataTable? LinqQueryToDataTable(IEnumerable<dynamic> v)
  {
    //i just really want to know if there is any data at all
    var firstRecord = v.FirstOrDefault();
    if (firstRecord == null)
      return null;

    




    //So dear record, what do you have?
    PropertyInfo[] infos = firstRecord.GetType().GetProperties();

    //my table should have the columns to support the properties
    DataTable table = new DataTable();

    //Add, add, add the columns
    foreach (var info in infos)
    {

      Type propType = info.PropertyType;

      if (propType.IsGenericType
          && propType.GetGenericTypeDefinition() == typeof(Nullable<>)) //Nullable types should be handled too
      {
        table.Columns.Add(info.Name, Nullable.GetUnderlyingType(propType));
      }
      else
      {
        table.Columns.Add(info.Name, info.PropertyType);
      }
    }

    //Hmm... we are done with the columns. Let's begin with rows now.
    DataRow row;

    foreach (var record in v)
    {
      row = table.NewRow();
      for (int i = 0; i < table.Columns.Count; i++)
      {
        row[i] = infos[i].GetValue(record) != null ? infos[i].GetValue(record) : DBNull.Value;
      }

      table.Rows.Add(row);
    }

    //Table is ready to serve.
    table.AcceptChanges();

    return table;
  }

  public static string PathCombine(string path1, string path2)
  {
    if (Path.IsPathRooted(path2))
    {
      path2 = path2.TrimStart(Path.DirectorySeparatorChar);
      path2 = path2.TrimStart(Path.AltDirectorySeparatorChar);
    }

    return Path.Combine(path1, path2);
  }
}

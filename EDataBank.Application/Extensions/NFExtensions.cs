using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace EDataBank.Application.Extensions;
public static class NFExtensions
{
  public static async Task ForEachAsync<T>(this List<T> list, Func<T, Task> func)
  {
    foreach (var value in list)
    {
      await func(value);
    }
  }

  public static T DeepCopy<T>(this T self)
  {
    var serialized = JsonConvert.SerializeObject(self);
    return JsonConvert.DeserializeObject<T>(serialized)!;
  }
}

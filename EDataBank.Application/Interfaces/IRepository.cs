using System.Linq.Expressions;
using Ardalis.Specification;

namespace EDataBank.Application.Interfaces;

  // from Ardalis.Specification
  public interface IRepository<T> : IRepositoryBase<T> where T : class
  {
  /// <summary>
  /// Gets all objects from database
  /// </summary>
  /// 
  Task<List<T>> GetAllAsync();
  /// <summary>
  /// Gets all objects from database without ef change tracking
  /// </summary>
  ///
  Task<List<T>> GetAllNoTrackingAsync();
  Task<T?> GetbyIdAsync(object id);
  Task<T?> FindAsync(Expression<Func<T, bool>> predicate);
  /// <summary>
  /// Find object by keys.
  /// </summary>
  /// <param name="keys">Specified the search keys.</param>
  Task<T?> FindAsync(params object[] keys);
  
  Task<List<T>> FilterAsync(Expression<Func<T, bool>> predicate);
  /// <summary>
  /// Create a new object to database.
  /// </summary>
  /// <param name="t">Specified a new object to create.</param>
  Task<T> InsertAsync(T t, bool save);
  Task<T> UpsertAsync(T t, bool save);
  /// <summary>
  /// add multiple entities
  /// </summary>
  /// <param name="entities"></param>
  /// <returns></returns>
  Task<int> InsertAsync(IEnumerable<T> entities, bool save);

  Task<int> BulkInsertAsync(IEnumerable<T> entities);
  Task<int> BulkUpsertAsync(IEnumerable<T> entities);
  /// <summary>
  /// update the object from database.
  /// </summary>
  /// <param name="t">Specified a existing object to delete.</param>  
  ///   /// <summary>
  /// Update object changes and save to database.
  /// </summary>
  /// <param name="t">Specified the object to save.</param>
  Task<int> UpdateAsync(T t);

  Task<int> BulkUpdateAsync(IEnumerable<T> entities);

  /// <summary>
  /// Get the total objects count.
  /// </summary>
}

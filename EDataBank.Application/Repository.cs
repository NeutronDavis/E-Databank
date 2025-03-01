using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using EDataBank.Application.Interfaces;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application
{

    // inherit from Ardalis.Specification type
    public class Repository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T> where T : class
    {
        private readonly EDataBankDbContext _context;
        public Repository(EDataBankDbContext dbContext) : base(dbContext)
        {
            _context = dbContext;
            DbSet = _context.Set<T>();
        }
        protected DbSet<T> DbSet { get; set; }
        public Task<List<T>> AllAsync()
        {
            return DbSet.ToListAsync();
        }

        public async Task<int> BulkInsertAsync(IEnumerable<T> entities)
        {
            try
            {
                DbSet.AddRange(entities);
                return await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }




        }

        public async Task<int> BulkUpsertAsync(IEnumerable<T> entities)
        {
            try
            {
                DbSet.UpdateRange(entities);
                return await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }




        }

        public Task<int> BulkUpdateAsync(IEnumerable<T> entities)
        {


            entities.ToList().ForEach(
                t =>
                {
                    var entry = _context.Entry(t);

                    DbSet.Attach(t);

                    entry.State = EntityState.Modified;


                }

                );

            return _context.SaveChangesAsync();

        }

        public async Task<List<T>> FilterAsync(Expression<Func<T, bool>> predicate)
        {
            return await DbSet.Where(predicate).ToListAsync<T>(); ;
        }

        public async Task<T?> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await DbSet.FirstOrDefaultAsync<T>(predicate);
        }

        public async Task<T?> FindAsync(params object[] keys)
        {
            return await DbSet.FindAsync(keys);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await DbSet.ToListAsync();
        }

        public async Task<List<T>> GetAllNoTrackingAsync()
        {
            return await DbSet.AsNoTracking().ToListAsync();
        }

        public async Task<T?> GetbyIdAsync(object id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task<T> InsertAsync(T t, bool save)
        {
            try
            {
                var newEntity = DbSet.Add(t);

                if (save) await _context.SaveChangesAsync();
                return newEntity.Entity;
            }
            catch (Exception)
            {

                throw;
            }


        }

        public async Task<T> UpsertAsync(T t, bool save)
        {
            try
            {
                var newEntity = DbSet.Update(t);

                if (save) await _context.SaveChangesAsync();
                return newEntity.Entity;
            }
            catch (Exception)
            {

                throw;
            }


        }

        public async Task<int> InsertAsync(IEnumerable<T> entities, bool save)
        {
            DbSet.AddRange(entities);
            if (save)
            {
                return await _context.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> UpdateAsync(T t)
        {
            var entry = _context.Entry(t);
            DbSet.Attach(t);
            entry.State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
    }

}

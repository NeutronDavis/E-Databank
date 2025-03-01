using Ardalis.Specification;

namespace EDataBank.Application.Interfaces
{
    public interface IReadRepository<T> : IReadRepositoryBase<T> where T : class
    {
    }
}
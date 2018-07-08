using System.Threading.Tasks;
using FastTrack.Core.Domain;

namespace FastTrack.Core.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<T> CreateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
using System.Threading.Tasks;
using FastTrack.Core.DTO;

namespace FastTrack.Core.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDTO> GetCommentAsync(int id);
        Task<CommentDTO> CreateCommentAsync(CommentDTO commentDto);
    }
}
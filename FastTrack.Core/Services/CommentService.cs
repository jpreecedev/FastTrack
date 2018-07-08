using System;
using System.Threading.Tasks;
using FastTrack.Core.Domain;
using FastTrack.Core.DTO;
using FastTrack.Core.Interfaces;
using FastTrack.Core.Repositories;

namespace FastTrack.Core.Services
{
    public class CommentService : ICommentService
    {
        private readonly IRepository<Comment> _commentService;

        public CommentService(IRepository<Comment> commentService)
        {
            _commentService = commentService;
        }

        public async Task<CommentDTO> GetCommentAsync(int id)
        {
            var comment = await _commentService.GetByIdAsync(id);

            return CommentDTO.From(comment);
        }

        public async Task<CommentDTO> CreateCommentAsync(CommentDTO commentDto)
        {
           var comment = await _commentService.CreateAsync(new Comment
            {
                Message = commentDto.Message,
                CreatedAt = DateTime.Now,
                AuthorId = commentDto.AuthorId
            });

            return await GetCommentAsync(comment.Id);
        }
    }
}
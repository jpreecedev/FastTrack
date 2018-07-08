using System;
using System.ComponentModel.DataAnnotations;

namespace FastTrack.Core.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        
        [Required]
        [MinLength(5)]
        public string Message { get; set; }

        public string AuthorId { get; set; }

        public static CommentDTO From(Domain.Comment comment)
        {
            return new CommentDTO
            {
                Id = comment.Id,
                AuthorId = comment.AuthorId,
                Message = comment.Message,
                CreatedAt = comment.CreatedAt
            };
        }

        public DateTime CreatedAt { get; set; }
    }
}
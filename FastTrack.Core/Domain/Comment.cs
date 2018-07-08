using System;

namespace FastTrack.Core.Domain
{
    public class Comment : BaseEntity
    {
        public string Message { get; set; }

        public string AuthorId { get; set; }
        
        public DateTime CreatedAt { get; set; }
    }
}
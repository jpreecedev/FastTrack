using System.Security.Claims;
using System.Threading.Tasks;
using FastTrack.API.Attributes;
using FastTrack.Core.DTO;
using FastTrack.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastTrack.API.Controllers
{
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [Authorize]
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> CreateComment([FromBody] CommentDTO commentDto)
        {
            commentDto.AuthorId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var result = await _commentService.CreateCommentAsync(commentDto);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetComment(int id)
        {
            var comment = await _commentService.GetCommentAsync(id);

            if (comment == null)
            {
                return new NotFoundResult();
            }

            return Ok(comment);
        }
    }
}
using FastTrack.API.ApiModels;
using FastTrack.API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FastTrack.API.Attributes
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.IsValid == false)
            {
                context.Result = new BadRequestObjectResult(new BadRequestModel
                {
                    Errors = context.ModelState.Errors()
                });
            }
        }
    }
}
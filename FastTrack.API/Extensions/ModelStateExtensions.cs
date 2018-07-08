using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace FastTrack.API.Extensions
{
    public static class ModelStateExtensions
    {
        public static IEnumerable<string> Errors(this ModelStateDictionary modelState)
        {
            if (modelState.IsValid == false)
            {
                return modelState.Values.SelectMany(
                    state => state.Errors.Select(error => error.ErrorMessage)
                );
            }

            return null;
        }
    }
}
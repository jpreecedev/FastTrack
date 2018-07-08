using System.Collections.Generic;

namespace FastTrack.API.ApiModels
{
    public class BadRequestModel
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
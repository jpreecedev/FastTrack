using FastTrack.Core.DTO.User;

namespace FastTrack.API.ApiModels
{
    public class AuthenticationResponseModel
    {
        public UserDTO Profile { get; set; }
        public string JWT { get; set; }
    }
}
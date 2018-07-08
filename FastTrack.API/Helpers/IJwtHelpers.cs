using FastTrack.API.ApiModels;
using FastTrack.Core.DTO;
using FastTrack.Core.DTO.User;

namespace FastTrack.API.Helpers
{
    public interface IJwtHelpers
    {
        string GenerateTokenFromUser(UserDTO user);
    }
}
using System.Threading.Tasks;
using FastTrack.API.Controllers;
using FastTrack.API.Helpers;
using FastTrack.Core.DTO.User;
using FastTrack.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace FastTrack.API.Tests.Controllers
{
    [TestFixture]
    public class AccountControllerTests
    {
        private Mock<IAuthenticationService> _userService;
        private Mock<IJwtHelpers> _jwtHelpers;

        [SetUp]
        public void SetUpTest()
        {
            _userService = new Mock<IAuthenticationService>();
            _jwtHelpers = new Mock<IJwtHelpers>();
            _jwtHelpers.Setup(helper => helper.GenerateTokenFromUser(It.IsAny<UserDTO>())).Returns(string.Empty);
        }

        [Test]
        public async Task Create_ValidUserModel_CreatesUserAndReturnsOk()
        {
            // Arrange
            _userService.Setup(service => service.CreateAsync(It.IsAny<RegisterUserDTO>(), It.IsAny<string>()))
                .Returns(Task.FromResult(IdentityResult.Success));

            var controller = new AccountController(_userService.Object, _jwtHelpers.Object);

            // Act
            var result = await controller.Register(new RegisterUserDTO
            {
                Email = "test@gmail.com",
                UserName = "test",
                Password = "SomeComplexP@55w0rd"
            });

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            _userService.Verify(service => service.CreateAsync(It.IsAny<RegisterUserDTO>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public async Task Create_ErrorDuringRegistration_ReturnsBadRequest()
        {
            // Arrange
            _userService.Setup(service => service.CreateAsync(It.IsAny<RegisterUserDTO>(), It.IsAny<string>()))
                .Returns(Task.FromResult(IdentityResult.Failed(new IdentityError())));

            var controller = new AccountController(_userService.Object, _jwtHelpers.Object);

            // Act
            var result = await controller.Register(new RegisterUserDTO());

            // Assert
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
            _userService.Verify(service => service.CreateAsync(It.IsAny<RegisterUserDTO>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public async Task Login_SignInSuccessfully_ReturnsOkResult()
        {
            // Arrange
            _userService.Setup(service => service.SignInAsync(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.FromResult(SignInResult.Success));

            var controller = new AccountController(_userService.Object, _jwtHelpers.Object);

            // Act
            var result = await controller.Login(new LoginUserDTO
            {
                Email = "email@domain.com",
                Password = "MockPass123@321"
            });

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            _userService.Verify(service => service.SignInAsync(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public async Task Login_FailedToSignIn_ReturnsBadRequest()
        {
            // Arrange
            _userService.Setup(service => service.SignInAsync(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.FromResult(SignInResult.Failed));

            var controller = new AccountController(_userService.Object, _jwtHelpers.Object);

            // Act
            var result = await controller.Login(new LoginUserDTO());

            // Assert
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
            _userService.Verify(service => service.SignInAsync(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }
    }
}
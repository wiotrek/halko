namespace Api.Dtos
{
    public class ChangePasswordDto
    {
        public string Login { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
namespace Api.Dtos
{
    public class ParticipantWithPointDto
    {
        public string Initial { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public PointDto Point { get; set; }
    }
}
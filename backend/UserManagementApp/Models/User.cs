namespace UserManagementApp.Models
{
    public class User
    {
        public int Id { get; set; }

        public required string fname { get; set; }

        public required string lname { get; set; }

        public string? FullName { get; set; }


        public DateTime BirthDate { get; set; }

        public int Age
        {
            get
            {
                var today = DateTime.Today;
                var age = today.Year - BirthDate.Year;
                
                if (BirthDate.Date > today.AddYears(-age)) age--;
                
                return age;
            }
        }

        public required string Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
using System.Diagnostics;

namespace backend.DataModels
{
    public class PublicUser
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
        protected PrivateUser privateUser;

        public PublicUser(string userName, string password)
        {
            this.UserName = userName;
            this.Password = password;
            this.privateUser = new PrivateUser(this.UserName, this.Password);
        }

        public PrivateUser GetPrivateUser()
        {
            return privateUser;
        }
    }

}
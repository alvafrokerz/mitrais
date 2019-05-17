using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiMitrais.Models.DTO
{
    public class UserRegister
    {
        [Required]
        public string phoneNumber { get; set; }

        [Required]
        public string firstname { get; set; }

        [Required]
        public string lastName { get; set; }

         
        public string dob { get; set; }


        [Required]
        public string gender { get; set; }

        [Required]
        public string email { get; set; }

    }
}
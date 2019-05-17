using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiMitrais.Models.DTO
{
    public class Response<T>
    {
        public T Body { get; set; }

        public Status Status { get; set; }
         

    }
}
using System.Collections.Generic;
using System.Web.Http;
using WebApiMitrais.Models.DTO;
using WebApiMitrais.Models;
using System.Linq;
using System.Web.Http.Cors;
using System;

namespace WebApiMitrais.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Post([FromBody]UserRegister value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Response<Dictionary<string, string>> response = new Response<Dictionary<string, string>>();
            Status status = new Status();
            try
            {
                 
                Database1Entities db = new Database1Entities();
                var isExist = db.Users.Where(x => x.MobileNumber == value.phoneNumber).Select(x => x).ToList();
 
                if (isExist.Count != 0)
                {
                    status.code = 304;
                    status.Message = "Phone Number Duplicate";
                    response.Status = status;
                    return Json(response);
                }
                User user = new User();
                try
                {
                    if (value.dob != "--")
                    {
                        DateTime dob = Convert.ToDateTime(value.dob);
                        user.DateOfBirth = dob;
                    }
                   
                }catch(Exception E)
                {
                    status.code = 304;
                    status.Message = "Kosongkan Tanggal atau isi dengan benar";
                    response.Status = status;
                    return Json(response);
                }
               
                user.MobileNumber = value.phoneNumber;
                user.FirstName = value.firstname;
                user.LastName = value.lastName;
                user.Gender = value.gender;
                user.Email = value.email;
                user.IsDeleted = 0;
                user.CreatedAt = DateTime.Now;
                db.Users.Add(user);
                db.SaveChanges();

                status.code = 200;
                status.Message = "success";
                response.Status = status;
                return Json(response);
            }
            catch(Exception e)
            {
                status.code = 500;
                status.Message = "INTERNAL SERVER EROR";
                response.Status = status;
                return Json(response);
            }
           
        }

        
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using restfulAPI.Data;
using restfulAPI.Models;

namespace restfulAPI.Controllers
{
    [Route("api/dummy")]
    public class dummyController : Controller
    {
        dataContext db = new dataContext();

        // metoda ce ne va returna toate instantele din baza de date
        [HttpGet]
        [Route("")]
        public IActionResult getDummy()
        {
            var dummys = db.People.ToList();
            return Ok(dummys);
        }

        // metoda prin care adaugam o noua instanta in baza de date
        [HttpPost]
        [Route("")]
        public IActionResult addDummy([FromBody] dummyModel dummy)
        {
            db.People.Add(dummy);
            db.SaveChanges();
            return Ok(dummy);
        }

        // metoda prin care cautam un user in baza de date
        [HttpPost]
        [Route("login")]
        public IActionResult findDummy([FromBody] dummyModel dummy)
        {
            var query = from u in db.People
                        where u.Username == dummy.Username && u.Parola == dummy.Parola
                        select u;

            return Ok(query.FirstOrDefault());
        }
    }
}

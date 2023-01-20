﻿using clinicalwebAPI.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace clinicalwebAPI.Entities
{
    public class Category1
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string Name { get; set; }
    }
}

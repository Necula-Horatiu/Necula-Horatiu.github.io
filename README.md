## Hei, salut

Sunt tot eu Horațiu, poate că m-ai văzut luni la workshop, poate că nu. Având în vedere că nu am reușit să termin tot ce mi-am propus am zis să iau totul de la capăt dar de această dată într-un ritm mai lent.

Well, ne propunem să realizăm primii pași în back-end și front-end, puțin și entity framework. Vom învăța despre modele, view-uri și controlăre. La final vom avea o mica aplicație prin care ne putem crea un cont iar mai apoi să ne logăm.

Înainte să facem set-up și să trecem la cod recomand să citiți documentația de mai jos, realizată de colegii mei.
[C# și ASP.NET](https://drive.google.com/drive/u/1/folders/1txn7mG5CfFEbXFMJWlhkFHDR5scej55z) și 
[AngularJS](https://drive.google.com/drive/u/1/folders/1txn7mG5CfFEbXFMJWlhkFHDR5scej55z)

### De ce avem nevoie

[Visual studio 2015 +](https://visualstudio.microsoft.com/vs/community/) cu extensie de .Net CORE. Foarte important să nu uitați să bifași la instalare ASP.NET and web dev și Azure dev. În caz ca deja avți visual-ul instalat pentru a modifica ceva mergeți în Control Panel / Visual studio 2017 / Modify

<img src="img/setup1.PNG" alt="hi" class="inline"/>

[Postman](https://www.getpostman.com/) 

Cont pe [Azure for students](https://azure.microsoft.com/en-us/free/students/) cu emailul de student
În caz că nu ești student sau din orice alt motiv nu îți poți face cont acolo te vei folosi de credențialele mele.
Dupa ce ți-ai facut cont și ai intrat pe [portal](https://portal.azure.com) vei găsi în stanga "Create a resource" > "SQL Database" > "Completam campurile (database name / resource group / facem si un nou server ) > "Create". Asteptam sa se faca deploy și dacă mergem pe pagina principală o să vedem la All resources baza de date respectiv server-ul nostru.

Dăm click pe baza de date, va trebui să setam niște regului de firewall, sus avem Add client IP și punem la START IP: 0.0.0.0 și la END IP: 255.255.255.255 iar apoi Save.

<img src="img/setup2.PNG" alt="hi" class="inline"/>

<img src="img/setup3.PNG" alt="hi" class="inline"/>

Acum mai trebuie să ne facem un tabel. Pentru asta, mergem pe baza noastra de date, Query editor(preview), ne logăm și va apărea o consolă unde putem scrie. Acolo băgam

```markdown

CREATE TABLE People (
    ID int IDENTITY(1,1) PRIMARY KEY,
    Nume varchar(255) NOT NULL,
    Varsta int,
    Username varchar(255),
    Parola varchar(255)
);

```

Câmpurile trebuie să aiba același nume cu cele din model. Dupa, putem interoga, gen

```markdown

INSERT INTO People (Nume, Varsta, Username, Parola)
VALUES ('Ceva Nume', 13, 'Ceva username', 'Ceva parola');

```

Nice! 


### Să trecem la cod

Deschidem visual studio. File > New > Project > Visual C# > Web > .NET Core > ASP.NET Core Web App. Îi punem numele restfulAPI și dam ok. În noua căsuța alegem API, suntem atenți să fie debifat Enable docker suport și bifat Configure for HTTPS. Ni se creează proiectul și-l rulăm. Ar trebui să obținem 

<img src="img/setup4.PNG" alt="hi" class="inline"/>

Închidem programul și creăm un nou folder pe care îl numim Models. În interiorul acestuia facem o clasa cu numele dummy.cs în care vom specifica atributele obiectului cu care ne vom juca. Astfel

```markdown

    public class dummyModel
    {
        private int Id { get; set; }

        private string Nume { get; set; }

        private int Varsta { get; set; }

        private string Username { get; set; }

        private string Parola { get; set; }
    }
    
```
Înainte de a ne face primele rute, avem nevoie de acces la baza de date. Pentru asta mergem în appsettings.json și adăugăm următorul cod unde server = "numele sv tau".database.windows.net, Database = "numele bazei tale de date", User Id = "Id-ul de la sv", Password= "parola de la sv". În cazul în care nu ți-ai făcut cont pe azure ele vor ramane exact ca în codul urmator.

```markdown

{
  "ConnectionStrings": {
    "UserConnection": "Server=angulartestsv.database.windows.net;Database=AngularTEST; User Id=horatiu.necula; Password=#Dwcdtryv7727"
  },

  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*"
}

```

Acest JSON ne ofera stringul de conectare pe care-l vom folosi pentru a ajunge la baza noastră de date. Pentru asta avem nevoie de un nou folder, Data, în interiorul căruia vom avea o clasa dataContext.cs ce conține

```markdown
using Microsoft.EntityFrameworkCore;
using System.IO;
using restfulAPI.Models;
using Microsoft.Extensions.Configuration;

namespace restfulAPI.Data
{
    public class dataContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder OptionsBuilder)
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile("appsettings.json");

            var configuration = builder.Build();
            OptionsBuilder.UseSqlServer(configuration["ConnectionStrings:UserConnection"]);
        }

        private DbSet<dummyModel> People { get; set; }
    }
}

```

Long story, short aici ne conectăm la baza noastra de date și tot aici ne declaram tabelele pe care le vom folosi. De exemplu daca mai aveam un tabel declaram un nou private DbSet<nume_model> nume_tabel {get; set;}

Acum vom merge in folderul Controllers și vom șterge ValuesController.cs și vom face noi o noua clasă dummyController.cs ce va moșteni interfata Controller
```markdown
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restfulAPI.Controllers
{
    public class dummyController : Controller
    {
    }
}

```

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/Necula-Horatiu/Necula-Horatiu.github.io/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.

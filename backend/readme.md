##Run Entity Framework Core
<!-- อาจต้องใช้เป็น 9 เพราะ pemelo ตอนนี้มีแค่ 9 -->

1.dotnet add package Microsoft.EntityFrameworkCore
2.dotnet add package Pomelo.EntityFrameworkCore.MySql. 
3.dotnet add package Microsoft.EntityFrameworkCore.Tools


##Model 
Models

##Controllers
Controller

##Data
Database


##แก้ไขเพิ่มเติม
EF Core 10
Pomelo 9


ติดตั้ง ef
dotnet tool install --global dotnet-ef


Database Migration

1.dotnet ef migrations add InitialCreate
2.dotnet ef database update


##คำสั่งเปลี่ยนแปลง
dotnet ef migrations add UpdateAgeToReadOnly

dotnet ef migrations add InitialCreate

ทดสอบ API
dotnet run
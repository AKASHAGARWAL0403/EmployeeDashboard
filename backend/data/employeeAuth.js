/*
Different Designation Are 
 1.) Admin
 2.) Director
 3.) Registar
 4.) Dean
 5.) Academic_dean
 6.) Admin_house_allotment
 */

/*
Different Section of Data are
1.) Basic Data
2.) Educational Data
3.) Family Data
4.) Prev Experience Data
5.) Pay Data
6.) Last 5 Year Stay Data
*/

var admin = [true , true , false , true , true , true];
var director = [true , true , true , true , false , true];
var registar = [true , true , false , true , true , false];
var dean = [true , true , true , true , true , true];
var academic_dean = [true , true , false , false , false , false];
var admin_house_allotment = [true , false , false , false , false , true];

exports.getAuthRight = (designation) => {
    switch(designation){
        case 'admin':
            return admin;
        case 'director':
            return director;
        case 'registar':
            return registar;
        case 'dean':
            return dean;
        case 'academic_dean':
            return academic_dean;
        case 'admin_house_allotment':
            return admin_house_allotment;
        default:
            return [false , false , false , false , false , false]; 
    }
}
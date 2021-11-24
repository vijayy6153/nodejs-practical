CREATE PROCEDURE `uspUserOwnedVechiclesGet` (IN `ParamUserId` INT)  BEGIN

	SELECT 
		tvo.id,
        CONCAT(u.name,' ',u.surname) as fullname,
        u.email as useremail,
        u.phone,
        u.location,
		v.vehicle_name,
        v.vehicle_brand,
        v.vehicle_number
	FROM 
		tie_vehicle_ownership tvo,
        vehicles v,
        user u
	WHERE
		tvo.user_id = ParamUserId AND
        tvo.user_id = u.id AND
        v.id = tvo.vehicle_id AND
        tvo.isDeleted IS NULL;
        
END

CREATE PROCEDURE `uspVehiclesList` (IN `page` INT, IN `offset` INT)  BEGIN
	declare skips INT;
    SET skips = offset * (page - 1);
    
    SELECT 
		COUNT(1) AS TotalRecord
	FROM 
		vehicles;
    
    SELECT 
		vehicle_name, vehicle_brand, vehicle_number, u.name as user
	FROM 
		vehicles v
    LEFT join tie_vehicle_ownership tvo on tvo.vehicle_id = v.id 
    LEFT join user u on tvo.user_id = u.id
	LIMIT skips, OFFSET;
END
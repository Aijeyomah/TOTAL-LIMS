INSERT INTO staff (
    id,
    first_name,
    last_name,
    email,
    igg,
    password,
    salt,
    role
)

VALUES
 (
     '34a040bc-c4fe-4ebc-aa62-62bd9fb63e75',
     'Ijeoma',
     'Eti',
     'admin01@total.com',
     '45667899UP',
     'de71af11949989a6712d817ce25590c825547eb76aa34757039383521730c83c',
     '$2b$10$/Ms17XUKXyIQBHMt4rStje',
     'super'
 )
 ON CONFLICT (email)
 DO UPDATE
 SET salt = EXCLUDED.salt;

--password: jilfr6jiu
export default {
  createStaff: `INSERT INTO staff(
        id,
        first_name,
        last_name,
        email,
        igg,
        password,
        salt
    ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, first_name, last_name, email
    `,
  updateStaffPassword: `
    UPDATE staff 
    SET 
    password = ($2),
    salt=($3)
    WHERE id=($1) RETURNING id, first_name, last_name, email, role
    `,
  updateStaffAccess: `
    UPDATE staff 
    SET 
    is_active=($2) 
    WHERE id=($1)
    `,
  findStaffByStaffId: 'SELECT * FROM staff WHERE staff_id= ($1)',
  getStaffByEmail: 'SELECT * FROM staff WHERE email=($1)',
  getStaffByIgg: 'SELECT * FROM staff WHERE igg=($1)'

};

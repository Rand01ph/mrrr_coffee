use diesel;
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;

use schema::coffee_beans;
use schema::coffee_beans::dsl::coffee_beans as all_coffee_beans;


#[derive(Serialize, Queryable, Debug, Clone)]
pub struct Coffee_bean {
    pub id: i32,
    pub name: String,
    pub processing: String,
    pub roasting: String,
    pub origin: String,
    pub image_url: String,
}

#[derive(Serialize, Deserialize, Insertable)]
#[table_name = "coffee_beans"]
pub struct NewCoffee_bean {
    pub name: String,
    pub processing: String,
    pub roasting: String,
    pub origin: String,
    pub image_url: String,
}


impl Coffee_bean {
    pub fn show(id: i32, conn: &MysqlConnection) -> Vec<Coffee_bean> {
        all_coffee_beans.find(id)
            .load::<Coffee_bean>(conn)
            .expect("Sometimes coffee_beans don't find")
    }

    pub fn all(conn: &MysqlConnection) -> Vec<Coffee_bean> {
        all_coffee_beans.order(coffee_beans::id.desc())
            .load::<Coffee_bean>(conn)
            .expect("Error herding coffee_beans")
    }

    pub fn create(coffee_bean: NewCoffee_bean, conn: &MysqlConnection) -> bool {
        diesel::insert_into(coffee_beans::table)
            .values(&coffee_bean)
            .execute(conn)
            .is_ok()
    }

    pub fn update_by_id(id: i32, coffee_bean: NewCoffee_bean, conn: &MysqlConnection) -> bool {
        use schema::coffee_beans::dsl::{
            name as n,
            processing as p,
            roasting as r,
            origin as o,
            image_url as img,
        };
        let NewCoffee_bean { name, processing, roasting, origin, image_url } = coffee_bean;
        diesel::update(all_coffee_beans.find(id))
            .set((n.eq(name), p.eq(processing), r.eq(roasting), o.eq(origin), img.eq(image_url)))
            .execute(conn)
            .is_ok()
    }

    pub fn delete_by_id(id: i32, conn: &MysqlConnection) -> bool {
        if Coffee_bean::show(id, conn).is_empty() {
            return false;
        }
        diesel::delete(all_coffee_beans.find(id))
            .execute(conn)
            .is_ok()
    }
}

use rocket_contrib::Json;
use serde_json::Value;
use db::DbConn;
use models::{Coffee_bean, NewCoffee_bean};

#[get("/coffee_beans", format = "application/json")]
fn all_coffee_beans(conn:DbConn) -> Json<Value> {
    let coffee_beans = Coffee_bean::all(&conn);
    Json(json!({
        "status": 200,
        "result": coffee_beans,
    }))
}

#[post("/coffee_beans", format = "application/json", data = "<new_coffee_bean>")]
fn new_coffee_bean(new_coffee_bean: Json<NewCoffee_bean>, conn: DbConn) -> Json<Value> {
    Json(json!({
        "status": Coffee_bean::create(new_coffee_bean.into_inner(), &conn),
        "result": Coffee_bean::all(&conn),
    }))
}

#[put("/coffee_beans/<id>", format = "application/json", data = "<new_coffee_bean>")]
fn update_coffee_bean(id: i32, new_coffee_bean: Json<NewCoffee_bean>, conn: DbConn) -> Json<Value> {
    let status = if Coffee_bean::update_by_id(id, new_coffee_bean.into_inner(), &conn) { 200 } else { 404 };
    Json(json!({
        "status": status,
        "result": Coffee_bean::all(&conn),
    }))
}

#[delete("/coffee_beans/<id>")]
fn delete_coffee_bean(id: i32, conn: DbConn) -> Json<Value> {
    let status = if Coffee_bean::delete_by_id(id, &conn) { 200 } else { 404 };
    Json(json!({
        "status": status,
        "result": null,
    }))
}

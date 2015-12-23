
import com.json.generators.JSONGenerator;
import com.json.generators.JsonGeneratorFactory;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(urlPatterns = {"/first"})
public class first extends HttpServlet {
    
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/kursvovaya";

    // Database credentials
    static final String USER = "root";
    static final String PASS = "atlanta";

    static Connection conn = null;
    static Statement stmt = null;
    static ResultSet rs = null;
    
    JsonGeneratorFactory factory;
    JSONGenerator generator;

    

    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String json="";
    
        String category = (String) request.getParameter("category");
         try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost/kursvovaya", "root", "atlanta");
            stmt = conn.createStatement();
        } catch (SQLException var4) {
            json="net"+var4;
            
        } catch (ClassNotFoundException var5) {
            json="net"+var5;
            
        }
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        factory = JsonGeneratorFactory.getInstance(); 
        generator = factory.newJsonGenerator(); 
        
        ArrayList ar = new ArrayList();
        HashMap JsonMap = new HashMap();
        
        String name="";
        String city="";
        String title="";
        String text="";
        String price="";
        String email="";
        String phone="";
        String date="";
        String id="";

        
         try{
            rs = stmt.executeQuery("SELECT * FROM main WHERE category='"+category+"'");
            while(rs.next()){
                HashMap temp = new HashMap();
                id=rs.getString("id");
                name= rs.getString("name");
                city = rs.getString("city");
                title=rs.getString("title");
                text=rs.getString("text");
                price=rs.getString("price");
                email=rs.getString("email");
                phone=rs.getString("phone");
                date=rs.getString("date");
                
                temp.put("id",id);
                temp.put("name", name);
                temp.put("city",city);
                temp.put("title",title);
                temp.put("text",text);
                temp.put("price", price);
                temp.put("email", email);
                temp.put("phone", phone);
                temp.put("date", date);
                temp.put("category",category);
                
                ar.add(temp);
                }
            
            JsonMap.put("advertisment", ar);
            json=generator.generateJson(JsonMap);
        } catch (SQLException e2) {
            json="net"+e2;
        }
        
        try {
             out.println("callback("+json+")");
        } finally { 
            out.close();
        }
             
    }

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        String code = (String) request.getParameter("code");
        String name = (String) request.getParameter("name");
        String city = (String) request.getParameter("city");
        String title = (String) request.getParameter("title");
        String text = (String) request.getParameter("text");
        String category = (String) request.getParameter("category");
        String price = (String) request.getParameter("price");
        String email = (String) request.getParameter("email");
        String phone = (String) request.getParameter("phone");
        String date = (String) request.getParameter("date");
           
        String respons="success";
        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost/kursvovaya", "root", "atlanta");
            stmt = conn.createStatement();
            stmt.executeUpdate("INSERT INTO `kursvovaya`.`main` (`code`, `name`,`city`,`title`,`text`,`category`,`price`,`email`,`phone`,`date`) VALUES ('"+code+"', '"+name+"','"+city+"','"+title+"','"+text+"','"+category+"','"+price+"','"+email+"','"+phone+"','"+date+"');");
         
        } catch (SQLException var4) {
            out.println(var4);
            respons="error"+var4;
        } catch (ClassNotFoundException var5) {
            out.println(var5);
              respons="error"+var5;
            
        }
        
        try {
            String json2="";
                json2 = "nu({\"success\": 200})";
                 out.println(json2);
        } finally {
            out.close();
        }
        
    }


}

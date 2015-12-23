
import com.json.generators.JSONGenerator;
import com.json.generators.JsonGeneratorFactory;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(urlPatterns = {"/third"})
public class third extends HttpServlet {

        
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




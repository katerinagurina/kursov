

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


@WebServlet(urlPatterns = {"/fifth"})
public class fifth extends HttpServlet {
     
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
    
        String id = (String) request.getParameter("id");
        String name=(String) request.getParameter("name");;
        String city=(String) request.getParameter("city");
        String text=(String) request.getParameter("text");
        String price=(String) request.getParameter("price");
        String email=(String) request.getParameter("email");
        String phone=(String) request.getParameter("phone");
        
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
        

        
         try{
            stmt.executeUpdate("UPDATE main SET name='"+name+"',city='"+city+"',text='"+text+"',price='"+price+"',phone='"+phone+"',email='"+email+"' WHERE id="+id+"");
            
        } catch (SQLException e2) {
            json="net"+e2;
        }
        
        try {
             out.println("again({\"success\": 200})");
        } finally { 
            out.close();
        }
        
    
    }

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
    }

}

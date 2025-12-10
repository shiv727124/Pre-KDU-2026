import java.util.Scanner;

public class UsernameChecker
{
	public static void main(String[] args)
	{
	    Scanner sc=new Scanner(System.in);
	    System.out.println("Enter username: ");
	    String u = sc.nextLine();
	    System.out.println("Enter confirmation: ");
	    String c = sc.nextLine();
	    sc.close();
	    System.out.println("Length 1: "+u.length());
	    System.out.println("Length 2: "+c.length());
	    if(u.length()==c.length()) System.out.println("Lengths match: true");
	    else System.out.println("Lengths match: false");
	    if(u.equals(c)) System.out.println("Strings match: true");
	    else System.out.println("Strings match: false");
	}
}
import java.util.*;

public class TicketCategories {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        ArrayList<String> list = new ArrayList<>();
        HashSet<String> set = new HashSet<>();
        HashMap<String, Integer> map = new HashMap<>();

        for (int i = 0; i < 10; i++) {
            String category = sc.nextLine().trim();

            list.add(category);
            set.add(category);

            
            if (map.containsKey(category)) {
                map.put(category, map.get(category) + 1);
            } else {
                map.put(category, 1);
            }
        }

        System.out.println("ArrayList: " + list);
        System.out.println("HashSet: " + set);
        System.out.println("HashMap: " + map);
    }
}
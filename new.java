import java.util.*;

public class SortByCount {
    public static void main(String[] args) {
        
        String[] items = {"Apple", "Banana", "Orange", "Apple", "Banana",
                          "Apple", "Grapes", "Orange", "Banana", "Cherry"};

        
        HashMap<String, Integer> map = new HashMap<>();
        for (String item : items) {
            if (map.containsKey(item)) {
                map.put(item, map.get(item) + 1); // increment count
            } else {
                map.put(item, 1); 
            }
        }

        
        List<Map.Entry<String, Integer>> list = new ArrayList<>(map.entrySet());

        
        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
            
            public int compare(Map.Entry<String, Integer> e1, Map.Entry<String, Integer> e2) {
                return e2.getValue() - e1.getValue(); 
            }
        });

        for (Map.Entry<String, Integer> entry : list) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
    }
}

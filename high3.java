import java.io.File;
import java.util.HashMap;
import java.util.Scanner;

public class high3 {
    public static void main(String[] args) throws Exception {

        File file = new File("C:/Users/adity/AppData/Local/Temp/vscodesws_3c1f6/jdt_ws/jdt.ls-java-project/bin/items.csv");
        Scanner sc = new Scanner(file);

        HashMap<String, Integer> map = new HashMap<>();

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            String[] items = line.split(",");

            for (int i = 0; i < items.length; i++) {
                String item = items[i];

                if (map.containsKey(item)) {
                    map.put(item, map.get(item) + 1);
                } else {
                    map.put(item, 1);
                }
            }
        }

        String top1 = null;
        String top2 = null;
        String top3 = null;

        int c1 = 0, c2 = 0, c3 = 0;

        Object[] keys = map.keySet().toArray();

        for (int i = 0; i < keys.length; i++) {
            String key = (String) keys[i];
            int count = map.get(key);

            if (count > c1) {
                c3 = c2; top3 = top2;
                c2 = c1; top2 = top1;
                c1 = count; top1 = key;
            } else if (count > c2) {
                c3 = c2; top3 = top2;
                c2 = count; top2 = key;
            } else if (count > c3) {
                c3 = count; top3 = key;
            }
        }

        System.out.println("Top 3 most popular items:");
        System.out.println(top1 + " = " + c1);
        System.out.println(top2 + " = " + c2);
        System.out.println(top3 + " = " + c3);
    }
}

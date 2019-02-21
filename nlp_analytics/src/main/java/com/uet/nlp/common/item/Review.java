package com.uet.nlp.common.item;
import java.util.regex.Pattern;
import java.util.Map;
import java.util.HashMap;

public class Review extends CrawledItem {
    public String parentId;

    // Duplicate these fields
    // trade off here for faster query
    public String brand;
    public String parentAuthor;
    public String parentItemType;
    public String parentProductId;
    public String parentBreadcrumb;

    
    public String author;
    public double rate;
    public String content;
    public double date;

    public Review() {
        itemType = "review";
    }

    public void normalize() {
        super.generateId(parentProductId + domain + author + rate + date);
    }

	// detect all the markings
	static final Pattern spacer = Pattern.compile("([!@#\\$%\\^\\*\\(\\)\\+={}\\|\\[\\]\\/\\?:;<>\'\"\\,\\.\\-])");
	// detect ghost dias
	static final Pattern ghost_diacritics = Pattern.compile("[\u0300\u0301\u0302\u0303\u0309\u0323\u02C6\u0306\u031B]");
	// detect duplicates >=2, good against stretching ends
	static final Pattern crude_duplicators_removal = Pattern.compile("(.)\\1+");
	// detect crude text-based emoticons
	static final Pattern text_emoticon_removal = Pattern.compile("[T\\^=\\-\\.\\,]{2,}");
	// detect unicode based emoticons
	static final Pattern unicode_emoticon = Pattern.compile("([" + ((char)0x1f600) + "-" + ((char)0x1f64f) + "])");
	static final Map<String, String> replacement_map = create_replacement_map();

	static Map<String, String> create_replacement_map() {
		// list the possible replacements
		String[][] replacements = {
			{"AaEeOoÁÀÃẠẢáàãạảÉÈẼẸẺéèẽẹẻÓÒÕỌỎóòõọỏ", "ÂâÊêÔôẤẦẪẬẨấầẫậẩẾỀỄỆỂếềễệểỐỒỖỘỔốồỗộổ", "\u02C6"},
			{"AaEeOoÁÀÃẠẢáàãạảÉÈẼẸẺéèẽẹẻÓÒÕỌỎóòõọỏ", "ÂâÊêÔôẤẦẪẬẨấầẫậẩẾỀỄỆỂếềễệểỐỒỖỘỔốồỗộổ", "\u0302"},
			{"AaÁÀÃẠẢáàãạả", "ĂăẮẰẴẶẲắằẵặẳ", "\u0306"},
			{"OoUuÓÒÕỌỎóòõọỏ", "ƠơƯưỚỜỠỢỞớờỡợở", "\u031B"},
			{"AaEeIiOoUuÂâĂăƠơƯưÊêÔôy", "ÁáÉéÍíÓóÚúẤấẮắỚớỨứẾếỐốý", "\u0301"},
			{"AaEeIiOoUuÂâĂăƠơƯưÊêÔôy","ÀàÈèÌìÒòÙùẦầẰằỜờỪừỀềỒồỳ", "\u0300"},
			{"AaEeIiOoUuÂâĂăƠơƯưÊêÔôy","ÃãẼẽĨĩÕõŨũẪẫẴẵỠỡỮữỄễỖỗỹ", "\u0303"},
			{"AaEeIiOoUuÂâĂăƠơƯưÊêÔôy","ẠạẸẹỊịỌọỤụẬậẶặỢợỰựỆệỘộỵ", "\u0323"},
			{"AaEeIiOoUuÂâĂăƠơƯưÊêÔôy","ẢảẺẻỈỉỎỏỦủẨẩẲẳỞởỬửỂểỔổỷ", "\u0309"}
		};
		// convert to HashMap
		HashMap<String, String> repl_map = new HashMap<>();
		for(String[] group:replacements) {
			String original = group[0];
			String correct = group[1];
			String diacritic = group[2];
			for(int i=0;i<original.length();i++) {
				repl_map.put(original.charAt(i) + diacritic, Character.toString(correct.charAt(i)) );
			}
		}
		return repl_map;
	}

	static String checkAndRemoveDiacritics(String target_string) {
		if(ghost_diacritics.matcher(target_string).find()) {
			for(Map.Entry<String, String> entry : replacement_map.entrySet()) {
				target_string = target_string.replace(entry.getKey(), entry.getValue());
			}
			target_string = ghost_diacritics.matcher(target_string).replaceAll("");
		}
		return target_string;
	}

	public static String processString(String target) {
		// first, replace the three dots and space them
		String crude = target.replaceAll("\\.{3,}", " \u2026 ");
		// remove all the emoticons and duplicators
		crude = text_emoticon_removal.matcher(crude).replaceAll("");
		crude = crude_duplicators_removal.matcher(crude).replaceAll("$1");
		// add spacings to all remaining standalone sentence marking and unicode emoticons
		String tokenized = spacer.matcher(crude).replaceAll(" $1 ");
		tokenized = unicode_emoticon.matcher(tokenized).replaceAll(" $1 ");
		// remove exaggerated spacing by the previous processes
		tokenized = tokenized.replaceAll(" {2,}", " ");
		// return
		return tokenized.trim();
	}
}

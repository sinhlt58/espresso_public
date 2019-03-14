import io, sys, json, re

_crash_train_format = re.compile("train_(\d{6})\n\"((.|\n)+?)\"\n(0|1)")
_crash_test_format = re.compile("test_(\d{6})\n\"((.|\n)+?)\"\n")
def crashToData(file_path, train_file=True):
	with io.open(file_path, "r", encoding="utf-8") as crash_file:
		if(train_file):
			all_cases = re.findall(_crash_train_format, crash_file.read())
			old_id = -1
			for ids, line, _, rat in all_cases:
				print("{} - {} - {}".format(ids, line, rat))
				assert int(ids) == old_id + 1
				old_id += 1
			return [ (line, 1-int(rat)) for ids, line, _, rat in all_cases]
		else:
			all_cases = re.findall(_crash_test_format, crash_file.read())
			return [ (ids, line) for ids, line, _ in all_cases]

_crash_train_starter = re.compile("train_(\d{6})")
_crash_test_starter =  re.compile("test_(\d{6})")
_emptyline = re.compile("^\s*$")
def blockCrashToData(file_path, train_file=True):
	with io.open(file_path, "r", encoding="utf-8") as crash_file:
		if(train_file):
			block_start, block_end = _crash_train_starter, _emptyline
		else:
			block_start, block_end = _crash_test_starter, _emptyline
		block = []
		all_cases = []
		line_id = -1
		for line in crash_file.readlines():
			line = line.strip()
			if(re.match(block_start, line)):
				# record the line id
				old_line_id = int(line_id)
				line_id = re.match(block_start, line).group(1)
				assert int(line_id) == old_line_id + 1, "{} - {}".format(line_id, old_line_id)
			elif(re.match(block_end, line)):
				# extract the line and rating from there
				print(block)
				if(train_file):
					rating = 1 - int(block[-1])
					raw_sentence = "\n".join(block[:-1]).strip()
					assert raw_sentence[0] == raw_sentence[-1] == "\"", "raw_sentence: {}, {}, {}".format(raw_sentence, raw_sentence[0], raw_sentence[-1])
					all_cases.append( (raw_sentence[1:-1], rating) )
				else:
					raw_sentence = "\n".join(block).strip()
					assert raw_sentence[0] == raw_sentence[-1] == "\"", "raw_sentence: {}, {}, {}".format(raw_sentence, raw_sentence[0], raw_sentence[-1])
					all_cases.append( (line_id, raw_sentence[1:-1]) )
				# reset whole block
				block = []
			else:
				block.append(line)
	return all_cases

def dataToJSON(file_path, data, train_file=True):
	if(train_file):
		lines, ratings = zip(*data)
		# convert to 5/1 in string
		ratings = [str(rat*4+1) for rat in ratings]
		data = {"lines": list(lines), "ratings": ratings}
	else:
		indices, lines = zip(*data)
		data = {"lines": list(lines), "indices": list(indices)}
	with io.open(file_path, "w", encoding="utf-8") as json_file:
		json.dump([data], json_file, ensure_ascii=False, indent=2)

def dataToCSV(csv_path, data, check=True):
	with io.open(csv_path, "w", encoding="utf-8") as csv_file:
		# dictify and reload
		csv_file.write("id,label")
		if(check):
			checker_id = -1
		for idx, rat in zip(data["indices"], data["ratings"]):
			csv_rating = int(int(rat)<3)
			csv_file.write("\ntest_{:s},{:d}".format(idx, csv_rating))
			if(check):
				assert checker_id + 1 == int(idx), "Screwed disconnect data! expected {:d}, actually {:d}".format(checker_id+1, int(idx))
				checker_id += 1

if __name__=="__main__":
	mode = sys.argv[1]
	if(mode != "json" and "crash" not in mode):
		print("Mode json to convert json->crash and vice versa")
		sys.exit()
	if("crash" in mode):
		is_train = "train" in mode
		print("Train mode: ", is_train)
		crash_path, json_path = sys.argv[2:4]
		data = crashToData(crash_path, train_file=is_train)
		dataToJSON(json_path, data, train_file=is_train)
		print("Done conversion, found {:d} sentences".format(len(data)))
	else:
		json_path, crash_path = sys.argv[2:4]
		with io.open(json_path, "r", encoding="utf-8") as json_file:
			data = json.load(json_file)[0]
		dataToCSV(crash_path, data)

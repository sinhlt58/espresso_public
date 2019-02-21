import io, os, pickle, sys

CSV_PATH = "/home/quan/Workspace/Data/espresso/VnEmoLex.csv"
def loadCSV(path):
	with io.open(path, "r", encoding="utf-8") as csv_file:
		negative_set, positive_set = set(), set()
		for line in csv_file.readlines():
			list_item = line.split(",")
			if(len(list_item) < 4):
				print("line not in format: {:s}".format(line))
				continue
			orig, true_phrase, pos, neg, *_ = list_item
			true_phrase = true_phrase.strip().replace("\"", "")
			try:
				pos = int(pos)
				neg = int(neg)
			except ValueError:
				print("Error when converting {} and {} to int".format(pos, neg))
				continue
			if(pos == 1):
				positive_set.add(true_phrase)
			elif(neg == 1):
				negative_set.add(true_phrase)
			else:
				print("Phrase {:s} not positive/negative".format(true_phrase))
	return positive_set, negative_set

def loadReversalPhrases():
	return {"không","chẳng","k","ko","chả","không thể", "không có"}

SAVE_PATH = "/home/quan/Workspace/Data/espresso/dict.pickle"
def loadDictionary(save_path=SAVE_PATH, csv_path=CSV_PATH, force_reload=False):
	if(os.path.isfile(save_path) and not force_reload):
		with io.open(save_path, "rb") as save_file:
			data = pickle.load(save_file)
	else:
		positive_set, negative_set = loadCSV(csv_path)
		reverse_set = loadReversalPhrases()
		positive_set, negative_set = remakeSets(positive_set, negative_set, reverse_set)
		with io.open(save_path, "wb") as save_file:
			data = positive_set, negative_set, reverse_set
			pickle.dump(data, save_file)
	return data

def remakeSets(positive_set, negative_set, reverse_set):
	# move all reversed pieces in positive/negative to their correct set
	# phrases must have _ to prevent reading inword (e.g k_ in kho)
	reverse_phrases = [(phr + " ") for phr in sorted(reverse_set, key=lambda it: len(it), reverse=True)]
	repeller_set = set()
	for item in positive_set:
		if(item.find(" ") < 0):
			# one word will be exempted
			continue
		if(any( (phr == item[:len(phr)] for phr in reverse_phrases) )):
			print("Reversed phrase detected(pos): {:s}".format(item))
			cut_length = next( (len(phr) for phr in reverse_phrases if phr in item) )
			repeller_set.add(item)
			negative_set.add(item[:cut_length].strip())
	positive_set = positive_set.difference(repeller_set)
	# do the same thing for negative
	repeller_set = set()
	for item in negative_set:
		if(item.find(" ") < 0):
			# one word will be exempted
			continue
		if(any( (phr == item[:len(phr)] for phr in reverse_phrases) )):
			print("Reversed phrase detected(neg): {:s}".format(item))
			repeller_set.add(item)
			positive_set.add(item[:cut_length].strip())
	negative_set = negative_set.difference(repeller_set)
	return positive_set, negative_set

positive_set, negative_set, reverse_set = loadDictionary()
sys.exit()
print("Positive set: {}".format(positive_set))
print("Negative set: {}".format(negative_set))
print("Reverse set: {}".format(reverse_set))

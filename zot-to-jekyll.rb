require 'bibtex'
require 'fileutils'

# Settings

bib_file = './_bibliography/test.bib'
pdf_dir = './archive/'

# Open the file

b = BibTeX.open("#{bib_file}")

# Move PDFs from subdirectories to main directory

Dir.glob("#{pdf_dir}/**/*.pdf") do |item|
  FileUtils.mv item, "#{pdf_dir}"
end

# Correct bib keys

b.each do |obj|
	obj.key.sub!(':', '')
	# puts obj.key
end


# Replace filenames

b.each do |obj|
	key = obj.key
	Dir.open("#{pdf_dir}/").each do |item|
	  if obj.file.split(".").first == item.split(".").first && item != "#{key}.pdf"  
	  	FileUtils.mv("#{pdf_dir}#{item}", "#{pdf_dir}#{key}.pdf")
	  	# puts key
	  end
	end
end

# Replace file entry in bib

b.each do |obj|
  key = obj.key
  filename = obj.file.split(".").first
  if filename != key
  	puts filename
    newfilename = filename.sub(filename,key)
    obj.file = "#{newfilename}.pdf:archive/#{newfilename}.pdf:application/pdf"
    puts "has been replaced by #{newfilename}"
  end
end

b.save

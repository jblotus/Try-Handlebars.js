SRC_DIR     = "src/"
DOC_DIR     = "doc/"
HR          = "\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\="

# compile sass & copy files into build/
task :compile do
	Dir.chdir(SRC_DIR) do
		sh "ruby build.rb"
	end
end

# local dev build
task :default do

    Rake::Task['compile'].execute

    puts
    puts "YOU BUILD IS SUCCESS"
    puts
end


# LAUNCH - syncs master with the gh-pages branch;
# rebuilds LIVE github documentation page
task :push_docs do
	puts
	puts "Updating meetup-swatches github page"
	puts "#{HR}"

	Rake::Task['compile'].execute

	branch = `git rev-parse --abbrev-ref HEAD`

	if "#{branch}" == "master\n"
		sh "rm -rf .sass-cache"
		sh "git checkout gh-pages"
		sh "git checkout master -- #{DOC_DIR}"
		sh "cp -r #{DOC_DIR} ./"
		sh "rm -rf #{DOC_DIR}"
		sh "git add ."
		sh "git commit -a -m \"update live docs\""
		sh "git push"
		sh "git checkout master"

		puts
		puts "#{HR}"
		puts "Succesfully updated docs in gh-pages\n"
		puts "Check http://meetup.github.io/meetup-swatches\n"
		puts "(sometimes github takes a few minutes to rebuild the page)\n"
		puts "#{HR}"
		puts
	else
		puts
		puts "WARNING: you're not on master."
		puts "you should be on master when running push_docs."
		puts
		puts "BUILD FAILED"
		puts
	end
end

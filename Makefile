VERSION := $(shell python3 -c "import json;print(json.load(open('manifest.json'))['version'])")
PACKAGE := dist/overflow-fixer-$(VERSION).zip
FILES := manifest.json content.js icon16.png icon48.png icon128.png README.md AGENTS.md LICENSE CONTRIBUTING.md

.PHONY: package clean

package:
	@mkdir -p dist
	zip -r $(PACKAGE) $(FILES)

clean:
	rm -rf dist

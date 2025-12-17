VERSION := $(shell python3 -c "import json;print(json.load(open('manifest.json'))['version'])")
PACKAGE := dist/overflow-fixer-$(VERSION).zip
FILES := manifest.json content.js icon16.png icon48.png icon128.png README.md AGENTS.md LICENSE CONTRIBUTING.md
HOOK_FILE := .git/hooks/pre-commit

.PHONY: package clean lint format hooks

package:
	@mkdir -p dist
	zip -r $(PACKAGE) $(FILES)

clean:
	rm -rf dist

lint:
	npx @biomejs/biome lint .

format:
	npx @biomejs/biome format --write .

hooks:
	@mkdir -p .git/hooks
	@cat <<'EOF' > $(HOOK_FILE)
#!/bin/sh
set -e
make format lint
EOF
	@chmod +x $(HOOK_FILE)
	@echo "Installed git pre-commit hook -> $(HOOK_FILE)"

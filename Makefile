MOCHA ?= ./node_modules/.bin/mocha
REPORTER ?= dot
MOCHA_REQUIRE ?= ./test/bootstrap/node
TESTS = $(shell find test -name "*.test.js")

test-all: test-unit

test: test-unit

test-unit:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--require $(MOCHA_REQUIRE) \
	$(TESTS)

test-watch:
	$(MOCHA) \
	--reporter list \
	--require $(MOCHA_REQUIRE) \
	$(TESTS) \
	--watch 

.PHONY: test-all test test-unit

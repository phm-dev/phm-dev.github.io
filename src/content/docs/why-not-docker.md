---
title: Why Not Docker?
description: Why running PHP in Docker containers for local development is often an architectural misunderstanding, and when native PHP runtime is a better choice.
---

## "Just use Docker, bro"

In the PHP world, there's a reflex that has grown into a default standard:

> Need to run a project locally? Throw everything into Docker.

PHP, nginx, database, Redis, queue, search engine, mailpit — and then add another management layer (Warden, DDEV, Lando), because `docker compose up` alone turns out to be insufficient.

This is where it's worth stopping and asking one question: **are we actually solving the problem, or have we just gotten used to working around it?**

## Docker is great. In its place.

This is not a text against Docker. Docker solves real, hard problems:

- environment isolation between projects,
- reproducible and deterministic deployments,
- encapsulation of system dependencies,
- scaling and orchestration in production.

That's why Docker **genuinely makes sense** for infrastructure services, even locally:

- PostgreSQL / MySQL
- Redis / Valkey
- RabbitMQ
- OpenSearch / Meilisearch
- Mailpit

These are independent processes with their own state, versions, and lifecycle. Keeping them in containers is sensible and pragmatic.

**But the PHP runtime is not an infrastructure service.**

It's a developer tool. An interpreter you work with directly: you run `php`, `composer`, `phpunit`, `phpstan`, `rector`, CLI scripts, debugger, watchers. And that's exactly why putting it in a container locally is very often an architectural misunderstanding.

## What happens when a container becomes a runtime prosthesis

In most ecosystems, the language runtime runs natively on the developer machine. Go is installed locally. Node runs locally, with `nvm` or `volta`. Python runs locally, with `pyenv` and virtualenv. Docker is sometimes used there, but as an option, not a foundation.

In PHP, things went differently over the years. Instead of organizing the way runtime is installed and versions are switched, many environments went toward: *"let's put PHP in a container, the problem will disappear"*. But the problem didn't disappear — it just moved down a layer.

From that point, every simple action starts requiring a middleman. Instead of running commands directly, you work through a container — which means:

- an additional I/O layer,
- an additional network layer,
- an additional configuration layer,
- an additional debugging layer,
- additional points where something can go wrong.

Every abstraction layer has a cost. Layers are not free.

## Every abstraction layer has a cost

This is the point that often gets lost under tool marketing. An abstraction layer:

- makes observability harder,
- distances the developer from the actual process,
- increases the number of places where things can go wrong,
- complicates debugging,
- introduces overhead — performance or cognitive.

The native model is simple:

```
interpreter → project → command
```

The container model becomes multilayered:

```
host OS → Docker Desktop → image → container → mounts / volumes / network → PHP
```

Any failure, slowdown, or inconsistency can stem from any of these layers. A simple problem stops being simple to diagnose.

## Hard data: performance is not a detail

### File system I/O

On macOS, Docker (even with VirtioFS) is **1.5x – 5x slower** than native file access.

For PHP frameworks, this has real implications:

- `vendor/` with thousands of files,
- Symfony/Laravel cache,
- compiled templates,
- session files.

Every request in dev mode = intensive filesystem access. Every test iteration = the same. Multiply by the number of requests per day.

### Cold start

| Operation | Time |
|-----------|------|
| `php -S localhost:8000` | ~50ms |
| `docker compose up` | 3–15s |

This isn't an optimization detail. It's the difference between *flow* and *waiting*.

### RAM and battery

| Runtime | RAM usage |
|---------|-----------|
| Native PHP | ~30MB |
| Docker Desktop + containers | 1–2GB |

Docker Desktop maintains a constantly running VM, synchronizes I/O, and manages virtual networking. On a developer laptop, this translates to noticeable battery drain and higher CPU usage with every operation.

### Debugger

**Natively:**
```
Xdebug → localhost:9003 → works
```

**In a container:**
- port forwarding,
- `host.docker.internal`,
- path mapping (host ↔ container),
- discrepancies between file paths in IDE and container.

These aren't edge cases. This is the daily reality of anyone trying to hit a breakpoint from an IDE.

### Comparison

| Criterion | Native PHP | Docker | Winner |
|-----------|-----------|--------|--------|
| Cold start | ~50ms | 3–15s | Native |
| File I/O (macOS) | 1x | 1.5–5x slower | Native |
| Debugger | trivial | requires configuration | Native |
| RAM | ~30MB | 1–2GB | Native |
| Disk | ~50MB | 500MB–2GB | Native |
| Battery usage | low | high | Native |
| Onboarding | requires tooling | easier | Docker |
| Infra (DB, Redis) | harder | easy | Docker |
| CI parity | none | possible | Docker |

**Score 6:3 for Native** — in the context of everyday developer environment.

## "Works on my machine" doesn't disappear. It just changes form.

The argument for Docker often sounds like: *Docker eliminates the "works on my machine" problem*. That's a half-truth.

Docker can increase environment reproducibility, but only when:

- images are well-defined and rebuilt after changes,
- versions are tracked and don't drift,
- the host system doesn't significantly affect I/O,
- processor architecture doesn't cause surprises (ARM vs x86),
- permissions and UID/GID are consistent between host and container,
- tools around the container are stable.

When any of these conditions isn't met, the problem *"which PHP version do you have?"* disappears, and new ones appear:

- *why is the container running slow?*
- *why are files being created with a different owner?*
- *why doesn't the debugger catch breakpoints?*
- *why does `composer install` in the container give different results than locally?*
- *why do you need to clear cache or rebuild the image after restart?*

This isn't a lack of competence. It's the architectural cost of adding unnecessary intermediate layers.

## Warden, DDEV, Lando — a signal, not a solution

Docker-based local environment management tools didn't appear out of nowhere. They exist because the *runtime-in-container* model generates so much friction that another layer is needed to hide it.

If to run a language interpreter you need:

- Docker,
- Docker Compose,
- a ready set of images,
- bootstrapping scripts,
- your own CLI,
- wrappers for command execution,
- and a set of instructions *"what to do when things fall apart"*,

then you haven't simplified the developer environment. You've complicated it — and then built a control panel for that complication.

Warden and similar tools can be convenient. But they solve problems created by a previous architectural decision, not by the nature of the task itself.

## The most overused argument: production parity

*"But we use Docker in production"* — this is one of the most common counterarguments. And one of the most overused.

A developer environment doesn't exist to simulate production in every layer. It exists to:

- **maximize iteration speed**,
- be predictable,
- provide a comfortable, short feedback loop.

Real production parity comes from:

- CI/CD,
- staging,
- integration and end-to-end tests.

Not a developer's laptop. Nobody reasonable expects the local environment to be a copy of a production cluster with load balancers, service mesh, and security policies from live.

## What's the right split?

This isn't a choice between *Docker and Native*. It's about the proper separation of responsibilities.

**Optimal setup:**

```bash
# Infrastructure — Docker
docker compose up -d mysql redis rabbitmq opensearch

# PHP runtime — natively
php -S localhost:8000
```

This approach isn't a compromise. It's the proper division of tools according to their nature:

- Docker manages processes with state, versions, their own lifecycle — services,
- native runtime gives direct, fast, unmediated access to the interpreter.

## When Docker for local PHP actually makes sense

To be fair: there are situations where PHP runtime in a container is justified:

- the project requires specific native libraries that are hard to install locally,
- the project is legacy — it's easier to freeze it than sensibly migrate.

These are real exceptions. The problem starts when the exception gets proclaimed the default standard.

## Where the problem came from

The real PHP problem over the years wasn't: *"we need Docker"*. It was: **for years there was no good, lightweight, and predictable way to manage local PHP runtime and its versions**.

When the ecosystem didn't provide a convenient answer to the question *how to easily install and switch PHP versions between projects*, a shortcut naturally appeared: *"let's throw everything into a container"*. And Docker became for many teams not so much the best solution as a substitute workaround for tooling gaps.

## Conclusion

Docker is a great tool. Like any good tool — it becomes a bad one when used for everything.

Running PHP locally in a container is sometimes justified, but in many projects it's simply an expensive detour around a problem that should be solved at the source.

If you containerize the database, queue, and cache — that's sensible. If you containerize the interpreter only because that's how it's been done, and then you need more tools to tame that decision — it's worth asking whether you confused the solution with the workaround.

A good developer environment isn't one with the most layers. It's one with **the least friction at the greatest predictability**.

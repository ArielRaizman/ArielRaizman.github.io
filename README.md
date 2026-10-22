# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Photo storage and compression

Media Manager metadata lives in `src/lib/assets/media_manager`; original photos live
in `static/media`. Keep `media-manager.config.json` pointed at these directories.

The `web` preset creates WebP images at quality 80, capped at 2,048 pixels wide under
`static/media/derived/web`. Gallery grids, gallery-index tiles, profile/story images,
and carousel slides use these variants when available. Lightboxes retain originals;
hero and gallery-banner backgrounds also retain originals. Missing or skipped
variants fall back to the original photo.

After adding photos, open Media Manager's **Compression** page and run the backfill
if coverage is incomplete. Commit the metadata, originals, and generated variants
together, then run `npm run build`. Uploads/imports automatically request the `web`
preset when automatic compression is enabled; files copied manually need a backfill.

The dependency is pinned to Media Manager v0.6.1. Its Git-installed package currently
contains the reader but lacks the source needed to build the editor. To launch the
editor, use a full checkout of that release, install its dependencies and build it,
then run its `bin/media-manager.js` **from this site's directory** so it discovers
this site's configuration. For example, with that checkout at `../media-manager`:

```bash
node ../media-manager/bin/media-manager.js
```

Compression adds derivatives without replacing originals. Media Manager skips a
variant when it would be larger than its source. Changing the preset requires a new
backfill and a site rebuild.

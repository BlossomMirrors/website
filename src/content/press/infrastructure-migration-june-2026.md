---
title: Infrastructure Migration Complete
date: 2026-06-14
description: Our server transfer is done. Here is what changes for existing machines, what happens automatically, and what you need to know about the new ISOs.
author: The BlossomOS Team
---

Our infrastructure transfer is complete. Here is what this means for you.

## Git access

Git access to our old server is being deactivated. Access to GitLab itself remains fully intact, so you can continue to browse code, open issues, and submit merge requests as normal. Only direct Git remote access to the old server is going away.

## What happens to existing machines

The old Git server and its container registry will be decommissioned once all existing machines have migrated to the new registry. That process happens automatically in the background. All you need to do is keep your machine running for a while and the migration will take care of itself. A new background service handles the transition, and you can follow its progress in the terminal if you want to keep an eye on things.

Machines that have not been running during this period will stop receiving updates after approximately two weeks. If your machine has been on and connected, you do not need to do anything at all.

## New ISOs

Because we changed our default OCI image tag, new ISOs have been published alongside this migration. If you are doing a fresh install, grab the latest image from the downloads page.

[Download BlossomOS](/downloads)

import fs from 'fs';
import path from 'path';

function SkinPlugin(skinName, extensions = ['css', 'scss']) {
    this.skinName = skinName;
    this.extensions = extensions.map((extension) => extension.toLowerCase());
}

SkinPlugin.prototype.apply = function(resolver) {
    resolver.plugin('normal-module-factory', (nmf) => {
        nmf.plugin('before-resolve', (result, callback) => {
            const parts = result.request.split('.');
            const extension = parts.pop();

            if (this.extensions.includes(extension)) {
                const partsCopy = parts.slice();
                const targetIndex = partsCopy.length - 1;
                const sourceName = partsCopy[targetIndex];

                partsCopy[targetIndex] = sourceName + ':' + this.skinName;
                partsCopy.push(extension);

                const skinnedPath = partsCopy.join('.');
                const fullPath = path.resolve(result.context, skinnedPath);

                fs.stat(fullPath, (err) => {
                    if (!err)
                        result.request = skinnedPath;
                    callback(null, result);
                });
            }
            else
                callback(null, result);
        });
    });
};

module.exports = SkinPlugin;
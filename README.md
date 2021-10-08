# Data Migration Utility Stager

This action preps a directory of data loads for use with the [SFDX Data Migration Utility](https://github.com/forcedotcom/SFDX-Data-Move-Utility).

### `parentDir`

**Required** The parent directory in your git repo with the data to load. Default `"Data"`.

## Outputs

### `dirs`

Array of Directories

### `hasData`

Boolean if parent directory has data directories

### `directoryCount`

Count of the number of Directories



## Example usage

```yaml
name: Check for Data Files
        id: data
        uses: mrumschlag1/data-migration-util-stager@main
        with:
          parentDir: "output/data"

- name: Output results
        if: ${{ steps.data.outputs.hasData }}
        run: |
          echo "Found ${{ steps.data.outputs.directoryCount }} directories"
```
